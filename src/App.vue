<template>
  <div id="app" class="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/Home';

export default {
  name: 'App',
  components: { Home },
};
</script>
<style lang="scss">
.app {
  height: 100%;
}
</style>
