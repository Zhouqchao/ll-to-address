<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__title">经纬度 <i class="el-icon-right"></i> 地址</h1>
    </div>
    <div class="home__content">
      <el-form
        class="form"
        ref="form"
        :model="form"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="经纬度：" prop="inputStr" class="form__input">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 12 }"
            v-model.trim="form.inputStr"
            placeholder="每个地址的经纬度占一行，格式：经度,纬度
例如：116.43213,38.76623"
          ></el-input>
        </el-form-item>
        <el-form-item label="转换器：" prop="parser" class="form__select">
          <div class="flex">
            <el-select v-model="form.parser" placeholder="请选择转换器">
              <el-option
                v-for="parser in parsers"
                :key="parser.value"
                :label="parser.label"
                :value="parser.value"
                style="display: flex; align-items: center"
              >
                <img style="width: 14px; height: 14px" :src="parser.icon" />
                <span style="margin-left: 6px">{{ parser.label }}</span>
              </el-option>
            </el-select>
            <div class="btn__wrapper">
              <el-button
                type="primary"
                class="btn"
                :loading="isLoading"
                @click="submit"
                >转换
              </el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <div class="input">
        <input
          type="text"
          class="hidden"
          :value="addressList"
          id="addressList"
        />
      </div>

      <div class="output">
        <div class="output__label el-form-item__label">结果：</div>
        <div class="flex flex-1">
          <el-input
            class="output__textarea"
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 12 }"
            :value="addressListStr"
            readonly
          ></el-input>
          <div class="btn__wrapper">
            <el-button
              type="primary"
              class="btn"
              id="btn-copy"
              data-clipboard-target=".output__textarea textarea"
            >
              复制
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="home__footer">©2022&nbsp;玛尔斯通&nbsp;&nbsp;</div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';

export default {
  name: 'Home',
  components: {},
  data() {
    const validateInputStr = (rule, value, callback) => {
      // check is empty
      if (!value) {
        return;
      }

      // check is number
      const points = this.form.inputStr.split('\n');
      const isValid = points.every((point) => {
        const [lat, lng] = point.split(',');

        return (
          lat !== '' &&
          lng !== '' &&
          !Number.isNaN(Number(lat)) &&
          !Number.isNaN(Number(lng))
        );
      });

      if (!isValid) {
        return callback(new Error('格式错误，请检查格式'));
      }

      callback();
    };

    return {
      form: {
        parser: 'gaode',
        inputStr: '',
      },
      formRules: {
        inputStr: [
          {
            required: true,
            message: '请输入经纬度',
            trigger: 'blur',
          },
          {
            validator: validateInputStr,
            trigger: ['blur', 'change'],
          },
        ],
        parser: [
          {
            required: true,
            message: '请选择转换器',
            trigger: ['blur', 'change'],
          },
        ],
      },
      parsers: [
        {
          label: '高德地图',
          value: 'gaode',
          icon: require('@/assets/parser-gaode.png'),
        },
        {
          label: '百度地图',
          value: 'baidu',
          icon: require('@/assets/parser-baidu.png'),
        },
      ],
      addressList: [],
      isLoading: false,
    };
  },
  computed: {
    addressListStr() {
      if (this.addressList?.length === 0) return '';

      return this.addressList.join('\n');
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initBMap();
      this.initClipboard();
    },
    initBMap() {
      this.$baiduGeo = new BMapGL.Geocoder({ extensions_town: true });
      this.$gaodeGeo = new AMap.Geocoder({ radius: 3000 });
    },
    initClipboard() {
      this.$clipboard = new ClipboardJS('#btn-copy');
      this.$clipboard.on('success', (e) => {
        e.clearSelection();
        this.$message.success('复制成功');
      });
      this.$clipboard.on('error', () => {
        this.$message.error('复制失败');
      });
    },
    submit() {
      this.addressList = [];

      this.$refs.form.validate(async (valid) => {
        try {
          if (!valid) return;

          this.isLoading = true;

          const points = this.form.inputStr.split('\n').map((point) => {
            const [lng, lat] = point.split(',');
            return { lng, lat };
          });
          const addressList = await this.getAddressList(points);
          this.addressList = addressList;
        } catch (error) {
          console.error(error);
          this.$message.error(error.message);
        } finally {
          this.isLoading = false;
        }
      });
    },

    getAddressList(points) {
      const reqList = points.map((point) => this.getAddress(point));
      return Promise.all(reqList);
    },

    async getAddress(point) {
      const { lng, lat } = point;

      return new Promise((resolve, reject) => {
        if (this.form.parser === 'baidu') {
          const point = [Number(lng), Number(lat)];

          this.$baiduGeo.getLocation(
            new BMapGL.Point(...point),
            function (res) {
              if (res) {
                resolve(res.address);
              }

              reject(new Error('根据经纬度查询地址失败'));
            }
          );
        }

        if (this.form.parser === 'gaode') {
          const self = this;
          AMap.plugin('AMap.Geocoder', function () {
            const point = [lng, lat];

            self.$gaodeGeo.getAddress(point, function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                resolve(result.regeocode.formattedAddress);
              }

              reject(new Error('根据经纬度查询地址失败'));
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  @apply w-full h-full flex flex-col overflow-hidden;

  &__header {
    @apply flex justify-center items-center bg-black text-white text-center text-2xl;
    height: 52px;
    line-height: 52px;
  }

  &__title-icon {
    @apply ml-2 cursor-pointer;
  }

  &__content {
    @apply flex-1 w-full mx-auto mt-10 overflow-auto;
    padding-left: 25%;
    padding-right: 25%;

    .input,
    .output {
      display: flex;

      &__label {
        width: 100px;
      }

      &__textarea {
        flex: 1;
      }
    }

    .output {
      margin-top: 50px;
    }
  }

  &__footer {
    @apply h-8 flex justify-center items-center bg-black text-white;
  }

  .btn__wrapper {
    width: 90px;
    @apply self-start flex justify-end ml-5;
  }
}
</style>
