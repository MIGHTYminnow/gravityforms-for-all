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
	 * Make checkboxes fields more accessible:
	 * - Add role="group" and aria-label to checkbox fields.
	 * - Convert .gfield_label labels to span on checkboxes to avoid
	 *   double labels on the same field.
	 */
	jQuery( '.ginput_container_checkbox' ).each(function(){
		var $label = jQuery( this ).closest( '.gfield' ).find( '.gfield_label' );
		var html = $label.html();
		var label = $label.text();
		$label.after( '<span class="gfield_label">' + html + '<span>' );
		$label.remove();
		jQuery( this ).attr( 'role', 'group' ).attr( 'aria-label', label );
	});

	/**
	 * Convert .gfield_label of Name fields to span
	 * to prevent orphaned labels.
	 */
	jQuery( '.ginput_container_name' ).each(function(){
		var $label = jQuery( this ).siblings( 'label' );
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
