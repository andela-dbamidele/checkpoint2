import React from 'react';

export default class DocHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access: 'Public'
    };
  }

  render() {
    const filter = this.state.access;
    return (
      <div className="doc-header">
        <div className="row">
          <div className="col s12 m6 l7">
            <p>Showing {filter} documents</p>
          </div>
          <div className="col s12 m6 l5">
            <select className="browser-default" name="access" id="access">
              <option value="all">All Documents</option>
              <option value="public">Public Documents</option>
              <option value="private">Private Documents</option>
              <option value="role">Role Based Documents</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
