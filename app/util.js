module.exports = {
  emptyMatrix,
  identityMatrix,
  randomMatrix,
  multiply
}

function emptyMatrix (m, n) {
  const matrix = []

  for (let i = 0; i < m; ++i) {
    const row = []
    for (let j = 0; j < n; ++j) row.push(0)

    matrix.push(row)
  }

  return matrix
}

function identityMatrix (n) {
  const matrix = emptyMatrix(n, n)

  for (let i = 0, j = 0, l = matrix.length; i < l; ++i, ++j) {
    matrix[i][j] = 1
  }

  return matrix
}

function randomMatrix (m, n, max, min) {
  const matrix = emptyMatrix(m, n)

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      matrix[i][j] = min + Math.floor(Math.random() * (max - min + 1))
    }
  }

  return matrix
}

function multiply (matrices) {
  return multiplyTwo(matrices[0], matrices[1])
}

function multiplyTwo (a, b) {
  // solution of MxN * NxP is MxP
  const solution = emptyMatrix(a.length, b[0].length)

  // move along a rows
  for (let i = 0, il = a.length; i < il; ++i) {
    // move along b columns
    for (let sum, j = 0, jl = b[0].length; j < jl; ++j) {
      sum = 0

      for (let k = 0, kl = a[i].length; k < kl; ++k) {
        sum += (a[i][k] * b[k][j])
      }

      solution[i][j] = sum
    }
  }

  return solution
}
