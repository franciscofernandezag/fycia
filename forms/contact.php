<?php
// Configuración del correo receptor
$receiving_email_address = 'contacto@exico.cl';

// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitiza y valida los datos del formulario
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Verifica si los campos no están vacíos
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Por favor, completa todos los campos.";
        exit;
    }

    // Verifica si el email es válido
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "El formato del correo no es válido.";
        exit;
    }

    // Configura el mensaje y las cabeceras
    $to = $receiving_email_address;
    $email_subject = "Contacto desde la página Web: $subject";
    $email_body = "Nombre: $name\n";
    $email_body .= "Correo: $email\n\n";
    $email_body .= "Mensaje:\n$message\n";

    // Asegúrate de codificar correctamente el mensaje
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envía el correo
    if (mail($to, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Error: No se pudo enviar el mensaje.";
    }
} else {
    // Si no es POST, retorna error
    http_response_code(403);
    echo "Error: El formulario no se ha enviado correctamente.";
}
?>
