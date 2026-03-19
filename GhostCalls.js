export default {
    name: "HideSpecificCall",
    description: "Oculta mensajes de llamada para un ID de canal específico.",
    authors: [{ name: "TuNombre", id: "000000000000000000" }],
    version: "1.0.0",

    onStart() {
        const { getByProps } = kettu.webpack;
        const MessageComponent = getByProps("Message", "default"); // Buscamos el componente de mensaje
        const targetChannelId = "1355988541506847053";

        // Usamos el patcher de Kettu (basado generalmente en la lógica de Vendetta/Enmity)
        kettu.patcher.before("default", MessageComponent, ([props]) => {
            const { message } = props;

            // Verificamos si es el ID del canal y si el tipo de mensaje es una llamada (tipo 3)
            if (message.channel_id === targetChannelId && message.type === 3) {
                // Modificamos el mensaje para que no renderice nada o tenga contenido vacío
                message.content = ""; 
                props.isVisible = false; // Intentamos forzar que no sea visible
            }
        });
    },

    onStop() {
        kettu.patcher.unpatchAll();
    }
};
