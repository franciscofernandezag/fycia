<?php
  // Dirección de correo a la que se enviarán los mensajes
  $receiving_email_address = 'contacto@exico.cl';

  // Verifica si el formulario fue enviado
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene los datos del formulario
    $name = strip_tags($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $subject = strip_tags($_POST['subject']);
    $message = strip_tags($_POST['message']);

    // Verifica que los campos requeridos no estén vacíos
    if ($name && $email && $subject && $message) {
      // Encabezados del correo
      $headers = "From: $name <$email>" . "\r\n" .
                 "Reply-To: $email" . "\r\n" .
                 "X-Mailer: PHP/" . phpversion();
      
      // Enviar el correo
      $success = mail($receiving_email_address, $subject, $message, $headers);
      
      if ($success) {
        echo 'Su mensaje fue recibido con éxito, muchas gracias!.';
      } else {
        echo 'Error al enviar el mensaje, por favor intente nuevamente.';
      }
    } else {
      echo 'Por favor complete todos los campos.';
    }
  } else {
    echo 'Método de envío no permitido.';
  }
?>
