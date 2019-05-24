<template>
    <div class="ruphi-icon-btn-group">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "IconBtnGroup"
    }
</script>

<style scoped>
  .ruphi-icon-btn-group{
    display: inline-flex;
  }
  .ruphi-icon-btn-group button{
    min-width: auto;
    padding: 0 10px;
    margin: 6px 0;
    box-shadow: 0 0px 0px 0px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 0px 5px 0 rgba(0,0,0,.12)!important;
    -webkit-box-shadow: 0 0px 0px 0px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 0px 5px 0 rgba(0,0,0,.12)!important;
    border-radius: 0;
  }
  .ruphi-icon-btn-group button:first-child{
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }
  .ruphi-icon-btn-group button:last-child{
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    border: none;
  }
</style>
