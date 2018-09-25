<template>
<div @paste="pastes($event)">
  <div id="ueditor" ref="editor"> 
    <script type="text/plain" :id="'myEditor' + num" style="width:100%">
    </script>
    <div class="btns">
        <span class="close">关闭(C)</span>
        <span class="send" @click="send">发送(S)</span>
      </div>
  </div>
  <Modal
      v-model="imgShow"
      title="发送图片"
      @on-ok="ok"
      @on-cancel="cancel" class-name="add_link">
      <img class="sendMsg" :src="imgSrc">
  </Modal>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      umeditor: null,
      menuList: ["copy", "paste"],
      menuItem: {},
      menuPosition: { x: 0, y: 0 },
      down: 0,
      num: 0,
      imgSrc: "",
      imgShow: false
    };
  },
  props: ["linkObj"],
  computed: {
    ...mapState({
      chatId: state => state.chat.chatId,
      currEmotion: state => state.emotions.currEmotion,
      randomID: state => state.files.randomID
    })
  },
  watch: {
    linkObj() {
      if (this.linkObj.isLink) {
        this.umeditor.execCommand("link", {
          href: this.linkObj.linkHref,
          title: this.linkObj.linkTitle,
          target: "_blank",
          _href: this.linkObj.linkHref
        });
      } else {
        this.umeditor.execCommand("unlink");
      }
    },
    currEmotion() {
      this.insertEmotion(this.currEmotion);
    }
  },
  created() {
    let temNum = parseInt(Math.random() * 10000)
    this.num = temNum
    // while(!this.randomID.includes(temNum)) {
    //   console.error(temNum)
    //   this.num = temNum
    //   this.$store.dispatch('files/RANDOM_ID', temNum)
    // }
  },
  mounted() {
    this.umeditor = window.UM.getEditor("myEditor" + this.num, {
      // 这里可以选择自己需要的工具按钮名称,此处仅选择如下七个
      toolbar: [],
      // focus时自动清空初始化时的内容
      autoClearinitialContent: true,
      // 关闭字数统计
      wordCount: false,
      // 关闭elementPath
      elementPathEnabled: false,
      // 默认的编辑区域高度
      initialFrameHeight: 130,
      // 更多其他参数，请参考umeditor.config.js中的配置项
      zIndex: 10,
      allHtmlEnabled: true,
      catchRemoteImageEnable: false,
      // 初始化默认编辑器获得焦点
      focus: true
    });
    // this.umeditor.addListener("keydown",function(type,event){
    //   debugger
    //   if(event.ctrlKey && 13===event.keyCode){
    //     //获取纯文本
    //     // let content = editor.getPlainTxt();

    //   }
    // })
    // selectionchange
    // window.addEventListener('resize', () => {
    //   console.log(111)
    //   this.umeditor.reset()
    // })
  },
  methods: {
    // @keydown="process"
    // process(event) {
    //     let e = event || window.event
    //     // let range = this.umeditor.selection.getRange()
    //     let ec = event.keyCode || event.which
    //     if (e.ctrlKey && ec === 13) {
    //         this.umeditor.execCommand('inserthtml', '<br/><br/>')
    //         return false
    //     }
    //     if (!e.ctrlKey && ec === 13) {
    //         this.send()
    //         return false
    //     }
    // },
    pastes(event) {
      if (event.clipboardData || event.originalEvent) {
        // not for ie11  某些chrome版本使用的是event.originalEvent
        let clipboardData =
          event.clipboardData || event.originalEvent.clipboardData;
        if (clipboardData.items) {
          // for chrome
          let items = clipboardData.items
          let len = items.length
          let blob = null

          // 阻止默认行为即不让剪贴板内容在div中显示出来
          // event.preventDefault();

          // 在items里找粘贴的image,据上面分析,需要循环
          for (let i = 0; i < len; i++) {
            if (items[i].type.indexOf("image") !== -1) {
              // getAsFile() 此方法只是living standard firefox ie11 并不支持
              blob = items[i].getAsFile();
            }
          }
          if (blob !== null) {
            let reader = new FileReader()
            let self = this
            reader.onload = function(event) {
              // event.target.result 即为图片的Base64编码字符串
              let base64Str = event.target.result;
              self.imgSrc = base64Str;
              self.imgShow = true;
              // 可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
              // uploadImgFromPaste(base64Str, 'paste', isChrome);
            };
            reader.readAsDataURL(blob);
          }
        } else {
          // for firefox
          setTimeout(function() {
            // 设置setTimeout的原因是为了保证图片先插入到div里，然后去获取值
            // let imgList = document.querySelectorAll("#tar_box img")
            // let len = imgList.length
            // let srcStr = ""
            // for (let i = 0; i < len; i++) {
            //   if (imgList[i].className !== "my_img") {
            //     // 如果是截图那么srcStr就是base64 如果是复制的其他网页图片那么srcStr就是此图片在别人服务器的地址
            //     srcStr = imgList[i].src;
            //   }
            // }
            // uploadImgFromPaste(srcStr, 'paste', isChrome);
          }, 1);
        }
      }
    },
    process() {
      // this.umeditor.deleteContents()
      this.umeditor.execCommand("link", {
        href: "https://www.baidu.com",
        title: "百度",
        target: "_blank"
      });
    },
    insertEmotion(src) {
      this.umeditor.execCommand("insertimage", {
        src: src,
        width: "20",
        height: "20"
      });
    },
    browserType() {
      let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
      let isOpera = false;
      if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
      }
      if (userAgent.indexOf(".NET") > -1) {
        return "IE";
      }
      if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        isOpera = true;
        return "Opera";
      } // 判断是否Opera浏览器
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      } // 判断是否Firefox浏览器
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } // 判断是否Safari浏览器
      if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera
      ) {
        return "IE";
      } // 判断是否IE浏览器
    },
    showMenu(e) {
      this.menuPosition = { x: e.clientX, y: e.clientY };
    },
    ok() {
      this.$store.commit("chat/SEND_PASTE_IMG", {
        name: "我",
        info: this.imgSrc,
        type: 1,
        id: 899,
        chatId: this.chatId,
        infoType: 0,
        msgType: 1,
        chatTime: 1533260130
      });
    },
    cancel() {},
    send() {
      let self = this;
      if (this.umeditor.hasContents()) {
        this.$socket.emit(
          "send_msg",
          JSON.stringify({ msg: this.umeditor.getContent(), id: this.chatId, msgId: parseInt(Math.random() * 100 + 100) })
        );

        let timer = setTimeout(function() {
          self.umeditor.execCommand("cleardoc");
          clearTimeout(timer);
        });
      }
    },
    destroyed() {
      try {
        this.umeditor.destroy();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl';

.ivu-modal-body {
  max-width: 400px;
  max-height: 400px;
  setMiddle();
  margin: 0 auto;
}

.sendMsg {
  width: 90%;
}

#ueditor {
  text-align: left;
  height: 170px;
  relative();

  .edui-container {
    color: #545763;
    width: 100% !important;

    #myEditor {
      max-height: 130px !important;
      font-size: 14px;

      p {
        margin-top: 0;
        margin-bottom: 0;
        padding: 4px 0 3px;
      }
    }
  }

  .btns {
    z-index: 15;
    absolute();
    bottom: 20px;
    right: 20px;

    span {
      cursor: pointer;
      display: inline-block;
      width: 68px;
      center();
      border: 1px solid #ddd;
      height: 22px;
      line-height: 20px;
      bgColor(#f5f5f5);
      color(#606060);

      &:hover {
        bgColor(rgb(18, 150, 17));
        color: #fff;
      }
    }
  }
}
</style>
