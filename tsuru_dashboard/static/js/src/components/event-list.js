import React, { Component } from 'react';
import SwitchButton from 'backstage-switch-button';
import Dropdown from 'backstage-dropdown';
import TextInput from './text-input';
import styles from './event-list.css';


export class EventFilters extends Component {
  constructor(props) {
    super(props);

    this.state = { options: [] };
  }

  componentDidMount() {
    this.loadKinds();
  }

  loadKinds() {
    $.ajax({
      type: 'GET',
      url: "/events/kinds/",
      success: (data) => {
        let options = [];
        data.forEach((item) => {
          options.push(item.Name);
        });
        this.setState({ options: options });
      }
    });
  }

  render() {
    return (
      <div id='filter'>
        <form action='' method='GET' ref='form'>
          <Dropdown
            placeholder='choose an event kind'
            options={this.state.options}
            style={styles.eventFilter}
            name='kindName'
            value={this.props.kind}
          />
          <TextInput
            placeholder='search by target'
            name='target.value'
            value={this.props.target}
            style={styles.eventFilter}
          />
          <TextInput
            placeholder='search by owner'
            name='ownerName'
            value={this.props.owner}
            style={styles.eventFilter}
          />
          <SwitchButton
            label='error only'
            name='errorOnly'
            style={styles.eventFilter}
            checked={this.props.errorOnly}
          />
          <SwitchButton
            label='running only'
            name='running'
            style={styles.eventFilter}
            checked={this.props.running}
          />
          <SwitchButton
            label='include removed'
            name='includeRemoved'
            style={styles.eventFilter}
            checked={this.props.includeRemoved}
          />
          <button ref='btn' type='submit'>filter</button>
        </form>
      </div>
    );
  }
}
