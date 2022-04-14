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
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

[Icon, Form, FormItem, Link, Button, Input, Tooltip].forEach((comp) =>
  Vue.use(comp)
);

Vue.prototype.$message = Message;
