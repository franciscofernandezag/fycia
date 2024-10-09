<?php
  // Cambia la dirección de correo de destino
  $receiving_email_address = 'contacto@exico.cl';

  // Verifica que el archivo PHP Email Form exista
  if (file_exists($php_email_form = '../assets/vendor/php-email-form')) {
    include($php_email_form);
  } else {
    die('No se puede cargar la librería "PHP Email Form".');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  // Establecer el destinatario
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Mensajes del formulario
  $contact->add_message($_POST['name'], 'Nombre');
  $contact->add_message($_POST['email'], 'Correo');
  $contact->add_message($_POST['message'], 'Mensaje', 10);

  // Enviar el correo
  echo $contact->send();
?>
