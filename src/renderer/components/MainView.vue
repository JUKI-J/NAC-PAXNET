<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/paxnet_logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          네트워크접근제어(Genian NAC)
        </span>
        <div class="doc message" style="color: #ff545b;">
        </div>
        <div class="items">
          <form @submit.prevent="fnRunNAC">
            <div class="item">
              <div class="name">ID : </div>
              <div class="value">
                <input type="text" v-model="userID" autofocus/>
              </div>
            </div>
            <div class="item">
              <div class="name">PW : </div>
              <div class="value">
                <input type="password" v-model="userPW" />
              </div>
            </div>
            <br/>
            <div class="item">
              <div class="name"><input type="checkbox" id="isSaveID" v-model="isSaveID" true-value="1" false-value="0" @click="fnCheckSaveID($event);" />
                <label for="isSaveID">ID 저장</label>
              </div>
              <div class="name"><input type="checkbox" id="isAutoRun" v-model="isAutoRun" true-value="1" false-value="0" @click="fnCheckAutoRun($event);"/>
                <label for="isAutoRun">자동로그인</label>
              </div>
              <!-- <div class="name"><input type="checkbox" id="isSystemBoot" v-model="isSystemBoot" true-value="1" false-value="0"/>
                <label for="isSystemBoot"></label> Windows와 함께 자동실행
              </div> -->
              <!-- <div id="settings" ></div> -->
            </div>
            <div class="item login_div" style="margin-top: 5px;">
              <button class="login_btn" v-bind:class="{ active : isActive }" >로그인</button>
            </div>
          </form>
        </div>
      </div>

      <div class="right-side">
        <google-ping></google-ping>
      </div>
    </main>
    <div style="position: fixed; bottom: 10px; right: 10px;">
      <p>bug report : jukijung@paxnet.kr</p>
    </div>
  </div>
</template>

<script>
  import GooglePing from './LandingPage/GooglePing';
  import { ipcRenderer } from 'electron';

  export default {
    name: 'main-view',
    components: { GooglePing },
    methods: {
      async fnRunNAC() {
        this.isActive = false;
        document.querySelector('.login_btn').textContent = 'in processing...';
        const args = {
          userID: this.userID,
          userPW: this.userPW,
          isSaveID: this.isSaveID,
          isAutoRun: this.isAutoRun,
          isSystemBoot: this.isSystemBoot,
        };
        ipcRenderer.send('runNAC', args);
        ipcRenderer.on('runNAC-reply', (event, message) => {
          document.querySelector('.message').innerHTML = `${message}`;
          document.querySelector('.login_btn').textContent = '로그인';
          this.isActive = true;
        });
      },
      fnCheckSaveID(e) {
        if (e.target.checked && this.userID === '') {
          document.querySelector('.message').innerHTML = 'ID cannot be empty.';
        } else {
          document.querySelector('.message').innerHTML = '';
        }
      },
      fnCheckAutoRun(e) {
        if (e.target.checked && (this.userID === '' || this.userPW === '')) {
          document.querySelector('.message').innerHTML = 'ID and Password cannot be empty.';
        } else {
          if (e.target.checked && this.userID !== '' && this.userPW !== '') {
            this.isSaveID = '1';
          }
          document.querySelector('.message').innerHTML = '';
        }
      },
    },
    created() {
      if (process.platform === 'win32') {
        ipcRenderer.send('user');
        ipcRenderer.on('user-reply', (event, data) => {
          const jsonValue = JSON.parse(data);
          this.isSaveID = jsonValue.isSaveID;
          this.isAutoRun = jsonValue.isAutoRun;
          this.isSystemBoot = jsonValue.isSystemBoot;
          if (jsonValue.isSaveID === '1') {
            this.userID = jsonValue.userID;
          }
          if (jsonValue.isAutoRun === '1') {
            this.userPW = jsonValue.userPW;
            this.fnRunNAC();
          }
        });
      } else {
        alert('Only available for Windows OS'); // eslint-disable-line
        window.close();
      }
    },
    data() {
      return {
        userID: '',
        userPW: '',
        isSaveID: '0',
        isAutoRun: '0',
        isSystemBoot: '0',
        isActive: true,
      };
    },
  };
</script>

<style>
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    width: 100%;
    height: 100%;
    padding: 60px 80px;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 210px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .login_btn {
    color: #42b983;
    background-color: transparent;
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #ff545b;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #ff545b;
  }

  input[id="save_id"] + label, input[id="auto_login"] + label, input[id="run_boot"] + label  {
  	display: inline-block;
  	width: 13px;
  	height: 13px;
  	border: 2px solid #bcbcbc;
  	cursor: pointer;
  }

  input[id="save_id"]:checked + label, input[id="auto_login"]:checked + label, input[id="run_boot"]:checked + label {
  	background-color: #ff545b;
  }

  input[id="save_id"], input[id="auto_login"], input[id="run_boot"] {
  	display: none;
  }

  #settings {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    background: url('~@/assets/btn_set.png') no-repeat 0 0;
  }

</style>
