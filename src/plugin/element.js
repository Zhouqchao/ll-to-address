import Vue from 'vue';
import {
  Icon,
  Form,
  FormItem,
  Link,
  Button,
  Input,
  Tooltip,
  Message,
  Select,
  Option,
  Alert,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

[
  Icon,
  Form,
  FormItem,
  Link,
  Button,
  Input,
  Tooltip,
  Select,
  Option,
  Alert,
].forEach((comp) => Vue.use(comp));

Vue.prototype.$message = Message;
