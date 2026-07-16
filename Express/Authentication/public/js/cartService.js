export function addBtnListeners() {
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      const albumId = event.currentTarget.dataset.id

      try {
        const res = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ productId: albumId })
        })

        if (!res.ok) {
          return window.location.href = '/login.html'
        }

        await updateCartIcon()
      } catch (err) {
        console.error('Error adding to cart:', err)
      }
    })
  })
}

export async function updateCartIcon() {
  try {
    const res = await fetch('/api/cart/cart-count')
    const obj = await res.json()
    const totalItems = obj.totalItems

    document.getElementById('cart-banner').innerHTML =
      totalItems > 0
        ? `<a href="/cart.html"><img src="images/cart.png" alt="cart">${totalItems}</a>`
        : ''
  } catch (err) {
    console.error('Error updating cart icon:', err)
  }
}

export async function loadCart(dom) {
  const { checkoutBtn, userMessage, cartList, cartTotal } = dom

  try {
    const items = await fetchCartItems(dom)
    renderCartItems(items, cartList)
    updateCartTotal(items, cartTotal, checkoutBtn)
  } catch (err) {
    console.error('Error loading cart:', err)
    cartList.innerHTML = '<li>Error loading cart data.</li>'
  }
}

async function fetchCartItems({ userMessage, checkoutBtn }) {
  const res = await fetch('/api/cart/', { credentials: 'include' })

  if (!res.ok) {
    window.location.href = '/'
    checkoutBtn.disabled = true
    checkoutBtn.classList.add('disabled')
    userMessage.innerHTML = 'Please <a href="login.html">log in</a>.'
    return []
  }

  const { items } = await res.json()
  return items
}

function renderCartItems(items, cartList) {
  cartList.innerHTML = ''

  items.forEach(item => {
    const li = document.createElement('li')
    li.className = 'cart-item'

    const itemTotal = item.price * item.quantity

    li.innerHTML = `
      <div>
        <strong>${item.title}: </strong>
        <button data-id="${item.cartItemId}" class="remove-btn">🗑️</button>
      </div>
      <span>× ${item.quantity} = $${itemTotal.toFixed(2)}</span>
    `

    cartList.appendChild(li)
  })
}

function updateCartTotal(items, cartTotal, checkoutBtn) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.innerHTML = `Total: $${total.toFixed(2)}`

  if (total <= 0) {
    checkoutBtn.disabled = true
    checkoutBtn.classList.add('disabled')
  }
}

export async function removeItem(itemId, dom) {
  try {
    const res = await fetch(`/api/cart/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (res.status === 204) {
      await loadCart(dom)
    } else {
      console.error('Error removing item:', await res.text())
    }
  } catch (err) {
    console.error('Error removing item:', err)
  }
}

export async function removeAll(dom) {
  try {
    const res = await fetch(`/api/cart/all`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (res.status === 204) {
      await loadCart(dom)
    } else {
      console.error('Error clearing cart:', await res.text())
    }
  } catch (err) {
    console.error('Error clearing cart:', err)
  }
}
