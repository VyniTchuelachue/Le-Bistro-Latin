export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`/api${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new ApiError('Impossible de joindre le serveur. Vérifiez votre connexion ou appelez-nous.');
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(body.error || 'Une erreur est survenue.', { status: res.status, errors: body.errors });
  }
  return body;
}

export const api = {
  availability: (date) => request(`/availability?date=${encodeURIComponent(date)}`),
  reserve: (data) => request('/reservations', { method: 'POST', body: JSON.stringify(data) }),
  contact: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  eventInquiry: (data) => request('/events/inquiry', { method: 'POST', body: JSON.stringify(data) }),
};
