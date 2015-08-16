import React from 'react';
//import fetch from 'whatwg-fetch';
import Rx from 'rx';
export default class HelloListView extends React . Component {
  constructor() {
    super();
    this.state = {
      meetings: []
    }
  }
  componentWillMount() {
    this.getMeetingsObservable = Rx.Observable.create(function(obs) {
      fetch('http://localhost:1337/meeting').then(function(res) {
        return res.json();
      }).then(function(parsedJson) {
        obs.onNext(parsedJson);
        obs.onCompleted();
      });
    });

  }
  componentDidMount() {
    var that = this;
    var getMoreButtonDOMNode = React.findDOMNode(this.refs.getMore);
    this.getMoreButtonOnClickObservable = Rx.Observable.fromEvent(getMoreButtonDOMNode, 'click');
    this.combinedObservable = this.getMoreButtonOnClickObservable.flatMapLatest( this.getMeetingsObservable);
    this.getMeetingsObserver = this.combinedObservable.subscribe(function(data) {
      that.setState({
        meetings: data
      });
    });
  }
  componentWillUnmount() {}
  renderItem(item, index) {
    return (
      <div key={index}>
        {item}
    </div>);
  }
  onNext() {}
  render() {
    return (
      <div>
        <div ref="getMore" onClick={this.onNext.bind(this)}> Get More</div>
        {this.state.meetings.map(this.renderItem, this)}
      </div>
      );
  }
}