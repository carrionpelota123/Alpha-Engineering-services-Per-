export const SERVICE_PREFILL_EVENT = 'alpha-engineering:prefill-servicio'

/**
 * Pide que el formulario de contacto se abra con un servicio ya elegido.
 * Lo usan las tarjetas de servicio para que el cliente no tenga que
 * volver a escribir a mano lo que ya eligio.
 */
export function requestServicePrefill(titulo: string) {
  window.dispatchEvent(new CustomEvent<string>(SERVICE_PREFILL_EVENT, { detail: titulo }))
}
