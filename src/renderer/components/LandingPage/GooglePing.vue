<template>
  <div class="doc">
    <div class="title">Google Ping</div>
    <p>{{ code }} :</p>
    <p>{{ message }}</p>
    <span class="dot" v-bind:style="pingStatus"></span>
    <br/><br/>
    <p>시작프로그램 등록방법<br/>
      1) 윈도우키 + R<br/>
      2) shell:startup 입력<br/>
      3) 해당프로그램 바로가기 붙여넣기<br/>
    </p>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron';

  export default {
    data: () => ({
      code: 'test',
      message: 'test',
      pingStatus: {
        'background-color': '#ff545b',
      },
    }),
    created: function init() {
      this.ping();
    },
    methods: {
      ping: function ping() {
        return new Promise(() => {
          ipcRenderer.send('ping', 'ping');
          ipcRenderer.on('ping-reply', (event, result) => {
            const resultJson = JSON.parse(result);
            this.code = resultJson.resultCode;
            this.message = (resultJson.resultMessage === null) ? '[Connected]' : resultJson.resultMessage;
            this.pingStatus = { 'background-color': (resultJson.resultCode === 'SUCCESS') ? '#4fc08d' : '#ff545b' };
          });
        });
      },
    },
  };
</script>

<style scoped>
  .dot {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: inline-block;
  }
</style>
