jQuery(document).on('gform_post_render', function(){
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
	 * Convert .gfield_label to span to prevent orphaned 
	 * labels on Name, Address and Checkboxes fields.
	 */
	jQuery(
		'.ginput_container_name, '
		+ '.ginput_container_address, '
		+ '.ginput_container_checkbox'
	).each(function(){
		var $label = jQuery( this ).siblings( '.gfield_label' );
		var html = $label.html();
		$label.after( '<span class="gfield_label">' + html + '<span>' );
		$label.remove();
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
});
