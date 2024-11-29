import React, { Component } from 'react';
import './styles/Tag.css';

class Tag extends Component {
  render() {
    const { tag } = this.props;

    return (
      <div className='card-tag'>
        <span></span>
        <div>{tag}</div>
      </div>
    );
  }
}

export default Tag;
