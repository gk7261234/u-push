module.exports = {
  //valRule 目前之定义表单属性验证 后续可以补充其他验证（数据类型，长度。。。）
  validate: function (valRule,body) {
    let err = '';
    if (!valRule || valRule.length===0){
      return err;
    }
    err = (!Array.isArray(valRule)&&"验证规则不正确")||(!body&&"验证数据为空")||(typeof(body)!=='object'&&"表单数据类型不正确")||"";
    if (!err){
      for (let key in valRule){
        if (!valRule.hasOwnProperty(key))  continue;
        let arrStr = valRule[key];
        if (arrStr in body){

        } else {
          err = `缺少 ${arrStr} 参数`;
          break;
        }
      }
    }
    return err
  }
};