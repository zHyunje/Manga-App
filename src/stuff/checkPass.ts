const checkPass = (pass: string): string => {
  let strength = 0

  if (pass.length >= 8) strength += 1
  if (/[A-Z]/.test(pass)) strength += 1
  if (/[a-z]/.test(pass)) strength += 1
  if (/[0-9]/.test(pass)) strength += 1
  if (/[\W_]/.test(pass)) strength += 1

  // Avaliando a força
  if (strength <= 2) {
    return '0'
  } else if (strength === 3) {
    return '1'
  } else if (strength === 4) {
    return '2'
  } else {
    return '3'
  }
}

export default checkPass
