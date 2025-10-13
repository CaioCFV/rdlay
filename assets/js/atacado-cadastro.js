const MASK_PHONE = (e) => {
  const input = e.target;
  let value = e.target.value;
  input.setAttribute("minlength", 14);
  input.setAttribute("maxlength", 14);
  value = value.replace(/\D/g, ""); //Removaluee tudo o que não é dígito
  value = value.replace(/^(\d\d)(\d)/g, "($1) $2"); //Coloca parênteses em valueolta dos dois primeiros dígitos
  value = value.replace(/(\d{4})(\d)/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return (input.value = value);
};

const MASK_CPF = (e) => {
  const input = e.target;
  let value = e.target.value;
  input.setAttribute("minlength", 14);
  input.setAttribute("maxlength", 14);
  value = value.replace(/\D/g, ""); //Remove tudo o que não é dígito
  value = value.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
  value = value.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
  return (input.value = value);
};

const MASK_CEP = (e) => {
  const input = e.target;
  let value = e.target.value;
  input.setAttribute("minlength", 9);
  input.setAttribute("maxlength", 9);
  value = value.replace(/D/g, ""); //Remove tudo o que não é dígito
  value = value.replace(/^(\d{5})(\d)/, "$1-$2"); //Esse é tão fácil que não merece explicações
  return (input.value = value);
};

const MASK_DATA = (e) => {
  const input = e.target;
  let value = e.target.value;
  input.setAttribute("minlength", 10);
  input.setAttribute("maxlength", 10);
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");
  value = value.replace(/(\d{2})(\d{2})$/, "$1$2");
  return (input.value = value);
};
document.addEventListener("DOMContentLoaded", function () {
  const inputCPF = document.querySelector(
    '.cadastrob2b__sec2 input[name="cpf"]'
  );
  const inputDate = document.querySelector(
    '.cadastrob2b__sec2 input[name="date"]'
  );
  const inputWhatsapp = document.querySelector(
    '.cadastrob2b__sec2 input[name="whatsapp"]'
  );
  inputCPF.addEventListener("keypress", MASK_CPF);
  inputDate.addEventListener("keypress", MASK_DATA);
  inputWhatsapp.addEventListener("keypress", MASK_PHONE);
});
