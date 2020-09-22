let messages = {

	[CONFIG.WELCOME_CHANNEL_ID]: {

		"titles": {

			"en": "Welcome message",
			"es": "Mensage de bienvenida"

		},
		"descriptions": {

			"en": "Read rules channel",
			"es": "Lee el canal de normas"

		},
		"fields": [

			{

				"emojiName": "👍🏻",
				"rolCode": CONFIG.MEMBER,
				"descriptions": {

					"en": "Gain full access to the server",
					"es": "Gana acceso total al servidor"

				}

			},

		]

	},
	[CONFIG.ROLES_CHANNEL_ID]: {

		"titles": {

			"en": "Autorol message",
			"es": "Mensage de autorol"

		},
		"descriptions": {

			"en": "Reacto to one of the next emojis to gain the optional role and gain access to exclusive text and voice channels.",
			"es": "Reacciona a uno de los próximos emojis para obtener el rol opcional y obtener acceso a canales de texto y voz exclusivos."

		},
		"fields": [

			{

				"emojiName": "🇪🇸",
				"rolCode": CONFIG.ROL_ES,
				"descriptions": {

					"en": "Espanish rol",
					"es": "Rol español"

				}

			},
			{

				"emojiName": "🔔",
				"rolCode": CONFIG.ROL_NOTIFICATION,
				"descriptions": {

					"en": "Notification rol",
					"es": "Rol de notificacion"

				}

			},
			{

				"emojiName": "⛏️",
				"rolCode": CONFIG.ROL_PROGRAMING,
				"descriptions": {

					"en": "Programing rol",
					"es": "Rol de programacion"

				}

			}

		]

	}

}

getMessages = () => {

	return messages;

}

module.exports = {getMessages}