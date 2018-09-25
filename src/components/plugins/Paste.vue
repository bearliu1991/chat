<template>
  <div id="paste" @click="paste" @mouseover="getActiveElement">粘贴</div>
</template>

<script>
  export default {
    name: "Paste",
    data() {
      return {
        activeEl: null,
        SELECTION: null
      }
    },
    props: ['menuItem'],
    methods: {
      paste() {
        this.insertAfterCursor(this.activeEl, window.localStorage.copySelectionString)
      },
      getActiveElement() {
        this.activeEl = document.activeElement;
        let tagName = this.activeEl.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') {
          if (this.activeEl.selectionStart + 1) {
            // 非IE浏览器
            this.SELECTION = this.activeEl.selectionStart;
          } else {
            // IE
            var range = document.selection.createRange();
            range.moveStart("character", this.activeEl.value.length);
            this.SELECTION = range.text.length;
          }
        } else if (this.activeEl.getAttribute('contenteditable') === 'true') {
          this.SELECTION = window.getSelection().getRangeAt(0);
        }
      },
      insertAfterCursor(textDom, value) {
          let tagName = textDom.tagName.toLowerCase();
          if (tagName === 'input' || tagName === 'textarea') {
            this.insertText(textDom, value)
          } else if (textDom.getAttribute('contenteditable') === 'true') {
            this.insertHTML(textDom, value)
          }
      },
      insertText(editNode, text) {
        editNode.value = insterStr(editNode.value, text, this.SELECTION)
        function insterStr(str, flg, sn) {
            return str.slice(0, sn) + flg + str.slice(sn);
        }
      },
      insertHTML(editNode, html) {
        var dthis = editNode;
        // 要插入内容的某个div,在标准浏览器中无需这句话
        dthis.focus();
        let sel = null;
        let range = null;
        if (window.getSelection) {
          // IE9 and non-IE
          sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
            range = this.SELECTION;
            range.deleteContents();
            let el = document.createElement('div');
            el.innerHTML = html;
            let node = null;
            let lastNode = null;
            let frag = document.createDocumentFragment()
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
          }
        } else if (document.selection && document.selection.type !== 'Control') {
          // 在非标准浏览器中 要先让你需要插入html的div 获得焦点
          editNode.focus();
          // 获取光标位置
          let ierange = document.selection.createRange();
          // 获取光标位置
          ierange.pasteHTML(html);
          // 在光标位置插入html 如果只是插入text 则就是fus.text="..."
          editNode.focus();
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
