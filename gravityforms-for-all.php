<?php
/**
 * Plugin Name: Gravity Forms for All
 * Plugin URI: https://github.com/MIGHTYminnow/gravityforms-for-all
 * Description: Makes your Gravity Forms accessible.
 * Version: 1.0.3
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
