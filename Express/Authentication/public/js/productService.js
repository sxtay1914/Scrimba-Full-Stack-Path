// ===== Fetching products =====

export async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters)
  const res = await fetch(`/api/products?${queryParams}`)
  return await res.json()
}

// ===== Populate the genre dropdown =====

export async function populateGenreSelect() {
  const res = await fetch('/api/products/genres')
  const genres = await res.json() // expects an array of genres as strings: ['rock', 'pop', ...]
  const select = document.getElementById('genre-select')

  genres.forEach(genre => {
    const option = document.createElement('option')
    option.value = genre
    option.textContent = genre
    select.appendChild(option)
  })
}