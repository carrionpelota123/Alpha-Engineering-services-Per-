export type PrivacySection = {
  heading: string
  body: string
}

export type PrivacyNotice = {
  lastUpdated: string
  intro: string
  sections: PrivacySection[]
}

export const privacy: PrivacyNotice = {
  lastUpdated: '1 de enero de 2025',
  intro: 'Cumplimos la Ley N.° 29733, Ley de Protección de Datos Personales del Perú. Aquí explicamos qué hacemos con tus datos.',
  sections: [
    {
      heading: 'Qué datos recabamos',
      body: 'Solo los que decides enviarnos: nombre, teléfono o correo, y una descripción del servicio que necesitas. No recabamos cookies de seguimiento ni datos de tarjetas de pago.',
    },
    {
      heading: 'Para qué los usamos',
      body: 'Para contactarte, cotizarte el servicio, dar seguimiento al trabajo y avisarte de promociones futuras.',
    },
    {
      heading: 'Con quién los compartimos',
      body: 'No vendemos ni rentamos tus datos. Solo se comparten cuando la ley obliga a entregarlos a una autoridad competente.',
    },
    {
      heading: 'Cuánto tiempo los guardamos',
      body: 'Mientras dure la relación comercial o el tiempo necesario para cumplir obligaciones legales. Después se eliminan.',
    },
    {
      heading: 'Tus derechos ARCO',
      body: 'Puedes Acceder, Rectificar, Cancelar u Oponerte al uso de tus datos. También puedes revocar tu consentimiento cuando quieras. Basta con escribirnos indicando tu solicitud.',
    },
    {
      heading: 'Seguridad',
      body: 'El sitio usa conexión cifrada y hosting con certificaciones de seguridad. Ningún sistema es infalible, por eso no prometemos seguridad absoluta.',
    },
  ],
}
