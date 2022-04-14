<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__title">经纬度 <i class="el-icon-right"></i> 地址</h1>
      <el-tooltip
        class="home__title-icon"
        effect="dark"
        content="参考百度"
        placement="right"
      >
        <div slot="content">
          <el-link
            type="primary"
            href="https://lbs.baidu.com/index.php?title=jspopularGL/guide/geocoding"
            target="_blank"
            >根据百度地图逆地址解析API开发</el-link
          >
        </div>
        <i class="el-icon-warning-outline"></i>
      </el-tooltip>
    </div>
    <div class="home__content">
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        status-icon
        label-width="100px"
      >
        <el-form-item label="经纬度：" prop="inputStr">
          <div class="flex">
            <el-input
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 20 }"
              v-model.trim="form.inputStr"
              placeholder="每个地址的经纬度占一行，格式：经度,纬度
例如：116.43213,38.76623"
            ></el-input>
            <el-button
              type="primary"
              class="btn"
              :loading="isLoading"
              @click="submit"
              >转换</el-button
            >
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
            :autosize="{ minRows: 10, maxRows: 20 }"
            :value="addressListStr"
            readonly
          ></el-input>
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
      },
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
      this.$myGeo = new BMapGL.Geocoder();
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
      this.$refs.form.validate(async (valid) => {
        try {
          if (!valid) return;

          this.isLoading = true;

          const points = this.form.inputStr.split('\n').map((point) => {
            const [lat, lng] = point.split(',');
            return new BMapGL.Point(Number(lat), Number(lng));
          });
          const addressList = await this.getAddressList(points);
          this.addressList = addressList;
        } catch (error) {
          console.error(error);
          this.$message.error('查询失败，请稍后再试');
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
      return new Promise((resolve, reject) => {
        this.$myGeo.getLocation(point, function (res) {
          if (res) {
            resolve(res.address);
          }

          reject(null);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  @apply w-full h-full flex flex-col;

  &__header {
    @apply flex justify-center items-center bg-black text-white text-center text-2xl;
    height: 52px;
    line-height: 52px;
  }

  &__title-icon {
    @apply ml-2 cursor-pointer;
  }

  &__content {
    @apply flex-1 w-1/2 mx-auto mt-10;
    min-width: 500px;

    .input,
    .output {
      display: flex;

      &__label {
        width: 100px;
      }

      &__textarea {
        flex: 1;
        min-height: 200px;
      }
    }

    .btn {
      align-self: flex-start;
      margin-left: 20px;
    }

    .output {
      margin-top: 50px;
    }
  }

  &__footer {
    @apply h-8 flex justify-center items-center bg-black text-white;
  }
}
</style>
