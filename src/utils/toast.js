import {Toast} from "vant";

//基础toast
function baseToast(type, message) {
  Toast({
    type,
    message
  })
}

//自定义toast
function customToast(icon, message) {
  Toast({
    icon,
    message
  })
}

//加载toast
function loadingToast(message, forbidClick, loadingType) {
  Toast({
    type: "loading",
    message,
    forbidClick,
    loadingType
  })
}

//动态更新toast
function dynamicToast(duration, forbidClick) {
  const toast = Toast({
    type: "loading",
    duration: 0,
    forbidClick,
    message: `请等待 ${duration} 秒`
  })

  let second = duration
  const timer = setInterval(() => {
    second--
    if (second) {
      toast.message = `请等待 ${second} 秒`
    } else {
      clearInterval(timer)
      Toast.clear()
    }
  }, 1000)
}

let all = {
  baseToast,
  customToast,
  loadingToast,
  dynamicToast
}

export default all