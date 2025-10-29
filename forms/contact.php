<?php
// Configuración del correo receptor
$receiving_email_address = 'contacto@fycia.cl';

// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitiza y valida los datos del formulario
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Verifica si los datos son válidos
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Formato de correo inválido']);
        exit;
    }

    // Configura el correo
    $to = $receiving_email_address;
    $subject = "Contacto desde pagina Web: " . $subject;
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envía el correo
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Tu mensaje ha sido enviado. ¡Gracias!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error: No se pudo enviar el mensaje.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error: El formulario no se ha enviado correctamente.']);
}
?>
