<template>
  <Modal title="Settings" :visible="show" :footer="null" centered @cancel="$accessor.setting.close">
    <div class="slippage">
      <div class="field">
        <h3>Slippage tolerance</h3>
        <Row class="slippage-setting" :gutter="30">
          <Col :span="6">
            <div :class="slippage === '0.1' ? 'active btncontainer' : 'btncontainer'" @click="() => (slippage = '0.1')">
              <button>0.1%</button>
            </div>
          </Col>
          <Col :span="6">
            <div :class="slippage === '0.5' ? 'active btncontainer' : 'btncontainer'" @click="() => (slippage = '0.5')">
              <button>0.5%</button>
            </div>
          </Col>
          <Col :span="6">
            <div :class="slippage === '1' ? 'active btncontainer' : 'btncontainer'" @click="() => (slippage = '1')">
              <button>1%</button>
            </div>
          </Col>
          <Col :span="6">
            <Input v-model="slippage" :class="errorMsg ? 'has-error' : ''" size="large" suffix="%" />
          </Col>
        </Row>
      </div>

      <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { Modal, Row, Col, Input, Switch as Toggle } from 'ant-design-vue'

import { inputRegex, escapeRegExp } from '@/utils/regex'

// fix: Failed to resolve directive: ant-portal
Vue.use(Modal)

@Component({
  asyncData({ $accessor }) {
    return {
      slippage: $accessor.setting.slippage.toString()
    }
  },

  components: {
    Modal,
    Row,
    Col,
    Input,
    Toggle
  }
})
export default class Setting extends Vue {
  slippage = this.$accessor.setting.slippage.toString()
  errorMsg = ''

  get show() {
    return this.$accessor.setting.show
  }

  @Watch('slippage')
  onSlippageChanged(val: string, old: string) {
    this.$nextTick(() => {
      if (!inputRegex.test(escapeRegExp(val))) {
        this.slippage = old
      } else {
        const slippage = parseFloat(val)
        if (slippage > 50 || slippage <= 0 || isNaN(slippage)) {
          this.errorMsg = 'Enter a valid slippage percentage'
        } else {
          if (slippage < 1) {
            this.errorMsg = 'Your transaction may fail'
          } else {
            this.errorMsg = ''
          }

          this.$accessor.setting.setSlippage(parseFloat(val))
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../styles/variables';

.slippage {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .btncontainer {
    display: inline-block;
    width: unset;
    text-align: center;
    position: relative;
    max-width: 400px;
    margin: 10px auto;
    padding: 2px;
    border-radius: 30px;
    transition: ease all .3s;

    button{
      background:#000 !important;
      position: relative;
      border-radius: 30px;
      border-color: transparent;
    }

    &.active,
    &:hover,
    &:focus{
      background: linear-gradient(91.9deg, rgba(19, 236, 171, 0.8) -8.51%, rgba(200, 52, 247, 0.8) 110.83%);
    }

  }


  .field {
    &.row {
      display: flex;
      justify-content: space-between;
    }
    h3 {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.5;
      color: @text-color;
    }

    .slippage-setting {
      display: flex;
      align-items: center;
      flex-direction: row;

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: @bg-color;
        color: @text-color;
        padding: 10px 12px;
        border: 0;
        font-size: 12px;
        line-height: 20px;
        font-weight: 600;
        cursor: pointer;
        opacity: 1;
        min-width: 100px;

        &:active,
        &:focus,
        &:hover {
          background-color: @primary-color;
          outline: 0;
        }
      }

      button.active {
        background-color: @primary-color;
      }
    }
  }

  .error-message {
    color: #f5222d;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 8px;
  }
}
</style>

<style lang="less">
@import '../styles/variables';

.has-error {
  input {
    border-color: #f5222d;

    &:active,
    &:focus,
    &:hover {
      border-color: #f5222d !important;
    }
  }
}

.slippage {
  .ant-input-affix-wrapper {
    input {
      background-color: @bg-color;
      text-align: center !important;
      font-size: 12px;
      line-height: 20px;
      font-weight: 600;
    }
  }
}
</style>
