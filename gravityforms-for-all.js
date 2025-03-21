jQuery(document).on('gform_post_render', function( event, form_id, current_page ){
	var $form = jQuery( '#gform_' + form_id );

	function setAutocomplete( autocomplete, $container, catalog ) {
		var label_text = $container.closest( '.gfield' ).find( '.gfield_label' ).text().replace( '*', '' );
		if ( catalog.includes( label_text ) ) {
			$container.find( 'input' ).attr( 'autocomplete', autocomplete );
		}	
	}

	/**
	 * Implement autocomplete attribute.
	 */
	jQuery( '.ginput_container_name .name_first input' ).attr( 'autocomplete', 'given-name' );
	jQuery( '.ginput_container_name .name_last input' ).attr( 'autocomplete', 'family-name' );
	jQuery( '.ginput_container_email input' ).attr( 'autocomplete', 'email' );
	jQuery( '.ginput_container_phone input' ).attr( 'autocomplete', 'tel-national' );
	jQuery( '.ginput_container_text' ).each(function(){
		setAutocomplete( 'given-name', jQuery( this ), [
			'First Name',
		]);
		setAutocomplete( 'family-name', jQuery( this ), [
			'Last Name',
		]);
		setAutocomplete( 'organization', jQuery( this ), [
			'Company',
			'Organization',
			'Organization/Company',
		]);
	});

	/**
	 * Add role="group" and aria-label to checkbox fields.
	 */
	jQuery( '.ginput_container_checkbox' ).each(function(){
		var label = jQuery( this ).siblings( '.gfield_label' ).text();
		jQuery( this ).attr( 'role', 'group' ).attr( 'aria-label', label );
	});

	/**
	 * Set focus on the first input with errors.
	 */
	jQuery( '.gfield_error input' ).eq(0).focus();

	/**
	 * Implement aria-describedby to error inputs.
	 */
	jQuery( '.gfield_error input, .gfield_error select, .gfield_error textarea' ).each(function(){
		var id = jQuery(this).closest( '.gfield' ).find( '.validation_message' ).attr( 'id' );
		jQuery(this).attr( 'aria-describedby', '#' + id );
	});

	$form.find( '.ginput_recaptcha' ).each( function(){
		var $label = jQuery( this ).prev( '.gfield_label' );
		$label.after( '<span class="gfield_label">' + $label.html() + '</span>' );
		$label.remove();
	});
});

gform.addAction('gform_post_recaptcha_render', function (elem) {
	$response = jQuery( elem ).find( '.g-recaptcha-response' );
	$response.attr( 'aria-hidden', 'true' );
	$response.attr( 'aria-label', 'Ignore this field.' );
});
