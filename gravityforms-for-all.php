<?php
/**
 * Plugin Name: Gravity Forms for All
 * Plugin URI: https://github.com/MIGHTYminnow/gravityforms-for-all
 * Description: Makes your Gravity Forms accessible.
 * Version: 1.0.6
 * Author: MIGHTYminnow
 * Author URI: https://mightyminnow.com
 */

/**
 * Enqueue child theme styles and scripts.
 */
if ( ! function_exists( 'gfa_enqueue_assets' ) ) {
	add_action( 'wp_enqueue_scripts', 'gfa_enqueue_assets' );
	function gfa_enqueue_assets() {
		wp_enqueue_style( 'gravityforms-for-all', plugin_dir_url( __FILE__ ) . 'gravityforms-for-all.css', array(), '1.0.3' );
		wp_enqueue_script( 'gravityforms-for-all', plugin_dir_url( __FILE__ ) . 'gravityforms-for-all.js', array( 'jquery' ), '1.0.3', true );
	}
}

/**
 * WAVE Accessibility Fix: "Missing form label" on "Other" radio field.
 */
add_filter( 'gform_field_content', 'gf_other_choice_aria_label', 10, 5 );

if ( ! function_exists( 'gf_other_choice_aria_label' ) ) {
	function gf_other_choice_aria_label( $field_content, $field, $value, $entry_id, $form_id ) {
		if ( 'radio' == $field->type ) {
			$field_content = str_replace( "value='gf_other_choice'", "value='gf_other_choice' aria-label='Other'", $field_content );
		}

		return $field_content;
	}
}

/**
 * WAVE Accessibiity Fix: "Broken ARIA reference" on File Upload fields.
 */
add_filter( 'gform_field_content', 'gf_fileupload_broken_aria_reference_fix', 10, 5 );

if ( ! function_exists( 'gf_fileupload_broken_aria_reference_fix' ) ) {
	function gf_fileupload_broken_aria_reference_fix( $field_content, $field, $value, $entry_id, $form_id ) {
		if ( 'fileupload' == $field->type && ! isset( $field->validation_message ) ) {
			$field_content = str_replace( "aria-describedby='validation_message_{$form_id}_{$field->id} ", "aria-describedby='", $field_content );
		}

		return $field_content;
	}
}
