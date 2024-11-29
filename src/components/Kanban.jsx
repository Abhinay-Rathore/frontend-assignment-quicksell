import React, { Component } from 'react';
import './styles/Kanban.css';
import Navbar from './Navbar';
import Title from './Title';
import Card from './Card';
import Order from './Order';
import DATA from './getItems';

class Kanban extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grouping: localStorage.getItem('grouping') || 'status',
            ordering: localStorage.getItem('ordering') || 'title'
        };
    }

    componentDidMount() {
        const { ordering, grouping } = this.state;

        // Synchronize ordering and grouping state with localStorage
        localStorage.setItem('ordering', ordering);
        localStorage.setItem('grouping', grouping);
    }

    componentDidUpdate(prevProps, prevState) {
        const { ordering, grouping } = this.state;

        // Update localStorage on state change
        if (prevState.ordering !== ordering) {
            localStorage.setItem('ordering', ordering);
        }

        if (prevState.grouping !== grouping) {
            localStorage.setItem('grouping', grouping);
        }

        // If grouping changes to 'priority', reset ordering to 'title'
        if (grouping === 'priority' && prevState.grouping !== 'priority') {
            this.setState({ ordering: 'title' });
        }
    }

    setGrouping = (grouping) => {
        this.setState({ grouping });
    }

    setOrdering = (ordering) => {
        this.setState({ ordering });
    }

    render() {
        const { grouping, ordering } = this.state;

        return (
            <div className='page'>
                <Navbar 
                    grouping={grouping} 
                    ordering={ordering} 
                    setGrouping={this.setGrouping} 
                    setOrdering={this.setOrdering} 
                />
                <div className='board'>
                    {DATA[grouping].map(group => {
                        return (
                            <div className='group' key={group.title}>
                                <div className='group-column'>
                                    <Title 
                                        title={group.title} 
                                        grouping={grouping} 
                                        count={group.tickets.length} 
                                        available={grouping === 'user' ? DATA.users.filter(e => e.name === group.title)[0].available : null}
                                    />
                                    {Order(group.tickets, ordering).map(item => {
                                        return (
                                            <Card 
                                                key={item.id} 
                                                ticket={item} 
                                                grouping={grouping} 
                                                user={DATA.users.filter(e => e.id === item.userId)[0]} 
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Kanban;
