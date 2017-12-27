import React, { Component } from 'react';
import Sortable from 'sortablejs';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [1, 2, 3, 4, 5, 6, 7, 8].map(item => {
        return {
          id: item,
          width: 200,
          height: 200,
          background: this.randomColor()
        }
      })
    };

    this.itemDom = null; 
    this.mouse_x = null;
    this.timer = null;

  }

  // =================== 钩子 ===================================

  componentDidMount() {
    this.dargEvent();
    this.setSortable();
  }

  componentWillUnmount() {
    // 注销事件
    $("#items").off("mousedown", "**");
    $("#items").off("mousemove");
    $("#items").off("mouseup");
  }

  // ====================== Function =============================

  randomColor = () => {
    var r = parseInt(Math.random() * 255),
    g = parseInt(Math.random() * 255),
    b = parseInt(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';

  }

  setItemWidth = () => {
    // 保存 item 的width
    const { lists } = this.state;

    if (this.itemDom) {
      this.setState({
        lists: lists.map(item => {
          if (item.id === this.itemDom.id) { item.width = this.itemDom.parentElement.clientWidth }
          return item
        })
      })
    }

  }


  // =================== Event ========================

  setSortable = () => {
    const el = document.getElementById('items');

    this.sortable = Sortable.create(el, {
      sort: true,
      onSort: (evt) => {
        let { newIndex, oldIndex } = evt;
        if (newIndex !== oldIndex) { //  TODO  有位置变化处理
          let { newIndex, oldIndex } = evt;
          let { lists } = this.state;
          let oldobj = lists.splice(oldIndex, 1);
          lists.splice(newIndex, 0, oldobj[0]);
          this.setState({ lists });

        }
      }
    });
  }

  dargEvent = () => {

    const self = this;

    this.dargMouseDown('.div_wrapper_line');

    $('.App').on('mousemove', () => {
      var e = e || window.event;
      self.mouse_x = e.pageX;
    });

    $('.App').on('mouseup', () => {
      clearInterval(self.timer);
      self.timer = null;
      this.setItemWidth();
    });

  }

  dargMouseDown(className){
    const self = this;
    $('#items').on('mousedown', className, (e) => {
      e.stopPropagation(); e.preventDefault();
      this.itemDom = e.target;

      if (e.target.id) {

        let offsetLeft = e.target.offsetLeft;
        let margin_left = self.mouse_x - offsetLeft;
        var max_width = document.body.clientWidth,
          min_width = 10;

        self.timer = setInterval(() => {
          if (self.timer) {
            let to_x = self.mouse_x - margin_left; //
            to_x = Math.min(to_x, max_width);
            to_x = Math.max(to_x, min_width);
            e.target.style.left = to_x + "px";
            e.target.parentElement.style.width = to_x + "px";
          }
        }, 5);

      }
    })
  }

  // ======================= render =======================

  render() {
    const { lists } = this.state;
    return (
      <div className="App">
        <h1>基于 React 实现的自由布局</h1>
        <h4>可以自由排序、缩放</h4>
        <div id="items">
          {
            lists.map(item => {
              return (
                <div
                  style={{ width: item.width, height: item.height, background: item.background }}
                  key={`item-${item.id}`}
                  className="item">
                  {item.id}
                  <div id={item.id} className="div_wrapper_line"></div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
