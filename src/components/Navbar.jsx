import React, { Component } from 'react';
import './styles/Navbar.css';

const settingsIcon = '/icons/settings.svg';
const chevronIcon = '/icons/chevron-down.svg';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.button = React.createRef();
        this.drop = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (ev) => {
        if (this.drop.current && this.drop.current.contains(ev.target)) {
            this.setState({ isOpen: true });
        } else if (this.button.current && this.button.current.contains(ev.target)) {
            this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
        } else {
            this.setState({ isOpen: false });
        }
    };

    capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }

    render() {
        const { grouping, ordering, setGrouping, setOrdering } = this.props;
        const { isOpen } = this.state;

        return (
            <div className='navbar'>
                <div className='display-container' ref={this.button}> 
                    <div className='display'>
                        <img src={settingsIcon} alt="settings" />
                        <span>Display</span>
                        <img src={chevronIcon} alt="chevron down" />
                    </div>
                    {isOpen ? 
                        <div className='display-settings' ref={this.drop}>
                            <div className='display-setting'>
                                <div>Grouping</div>
                                <select 
                                    value={this.capitalize(grouping)} 
                                    onChange={e => {
                                        setGrouping(e.target.children[e.target.selectedIndex].getAttribute('data-id'));
                                    }}>
                                    <option key='status' data-id='status'>Status</option>
                                    <option key='user' data-id='user'>User</option>
                                    <option key='priority' data-id='priority'>Priority</option>
                                </select>
                            </div>
                            <div className='display-setting'>
                                <div>Sorting</div>
                                <select 
                                    value={this.capitalize(ordering)} 
                                    onChange={e => {
                                        setOrdering(e.target.children[e.target.selectedIndex].getAttribute('data-id'));
                                    }}>
                                    <option key='title' data-id='title'>Title</option>
                                    {grouping !== 'priority' ? <option key='priority' data-id='priority'>Priority</option> : null}
                                </select>
                            </div>
                        </div> 
                    : null}
                </div>
            </div>
        );
    }
}

export default Navbar;
