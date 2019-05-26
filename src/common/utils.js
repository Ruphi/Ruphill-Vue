export default {
  isDev(){
    return process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development';
  }
}
