import { formatDate, normalizeCpf, maskCpf } from "./index";

describe("utils", () => {
  it("should format a date correctly - formatDate", () => {
    const dateString = "2023-11-22";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("22/11/2023");
  });

  it("should handle invalid date strings", () => {
    const invalidDateString = "invalid-date";
    const formattedDate = formatDate(invalidDateString);
    expect(formattedDate).toBe("NaN/NaN/NaN");
  });

  it('should mask a CPF correctly - maskCpf', () => {
    const cpf = '12345678900';
    const maskedCpf = maskCpf(cpf);
    expect(maskedCpf).toBe('123.456.789-00');
  });

  it('should handle invalid CPF input - maskCpf', () => {
    const invalidCpf = '1234567';
    const maskedCpf = maskCpf(invalidCpf);
    expect(maskedCpf).toBe('1234567');
  });

  it('should remove non-numeric characters from CPF - normalizeCpf', () => {
    const cpfWithNonNumeric = '123.456.789-00';
    const normalizedCpf = normalizeCpf(cpfWithNonNumeric);
    expect(normalizedCpf).toBe('12345678900');
  });

  it('should handle empty string - normalizeCpf', () => {
    const emptyString = '';
    const normalizedCpf = normalizeCpf(emptyString);
    expect(normalizedCpf).toBe('');
  });
});
