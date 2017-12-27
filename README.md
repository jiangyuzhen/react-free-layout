## React-free-layout 

#### 基于 React 实现的自由布局, 可以自由排序、缩放

live demo:
https://jiangyuzhen.github.io/react-free-layout/


#### 解析知识点
> 基于 jQuery 的事件委托, 减少性能损耗
```
  $('#items').on('mousedown', '.div_wrapper_line', (e) => {
    // ...
  })
```
> [sortablejs](https://github.com/rubaxa/Sortable): Sortable is a minimalist JavaScript library for reorderable drag-and-drop lists.

> 利用 after 伪元素扩张操作区域
```
  .div_wrapper_line:hover{
      cursor: e-resize;
  }

  .div_wrapper_line::after{
      content: '';
      height: 100%;
      display: inline-block;
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: -15px;
      right: -15px;
  }

```