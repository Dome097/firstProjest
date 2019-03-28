/*
封装操作localstorage本地存储的方法，模块化的文件*/
import Vue from "vue";

const storage ={
  install(Vue) {
    Vue.prototype.storage = this;
    // Vue.prototype.set = this.set;
  },
  set(key, value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key){
    localStorage.removeItem(key);
  }
};
// Vue.prototype.storage = storage;
export default storage;
