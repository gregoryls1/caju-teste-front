export const maskCpf = (cpf: string) => {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const normalizeCpf = (cpf: string) => {
  return cpf.replace(/\D/g, "");
};
