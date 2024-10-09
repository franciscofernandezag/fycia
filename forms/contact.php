<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibe los datos del formulario
    $name = strip_tags(trim($_POST["name"])); // Sanitiza el nombre
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL); // Sanitiza el email
    $subject = strip_tags(trim($_POST["subject"])); // Sanitiza el asunto
    $message = trim($_POST["message"]); // Mensaje

    // Verifica que los campos no estén vacíos y que el email sea válido
    if (empty($name) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
      http_response_code(400);
      echo "Por favor completa el formulario correctamente.";
      exit;
    }

    // Dirección de correo donde quieres recibir los mensajes
    $recipient = "contacto@exico.cl";

    // Contenido del correo
    $email_subject = "Nuevo mensaje de contacto: $subject";
    $email_content = "Nombre: $name\n";
    $email_content .= "Correo: $email\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Cabeceras del correo
    $email_headers = "From: $name <$email>";

    // Intenta enviar el correo
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
      // Envío exitoso
      http_response_code(200);
      echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
      // Error al enviar
      http_response_code(500);
      echo "Hubo un problema al enviar tu mensaje, intenta nuevamente.";
    }
  } else {
    // Método no permitido
    http_response_code(403);
    echo "Hubo un problema con tu envío, intenta nuevamente.";
  }
?>
