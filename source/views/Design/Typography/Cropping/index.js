import React, { Component } from "react";
import $ from "./style.css";
import Button from "~/components/Button";
import Text from "~/components/Text";

class Sample extends Component {
	onRef = node => {
		if (!node) return;

		setTimeout(() => {
			this.setState({ height: node.offsetHeight });
		});
	};
	render({ children, serif, sans }, { height, noPadding }) {
		const togglePadding = e => this.setState({ noPadding: !noPadding });
		const classes = $({ sample: noPadding, sample_padding: !noPadding });

		return (
			<b class={classes} ref={this.onRef} onClick={togglePadding}>
				<b class={$.sample_height}>{height}</b>
				<b class={$({ sample_serif: !!serif, sample_sans: !!sans })}>
					{children}
				</b>
			</b>
		);
	}
}

export default () => (
	<b class={$.cropping}>
		<b class={$.side}>
			<b class={$.title}>serif / xsmall</b>
			<Sample>
				<Text serif xsmall>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>serif / small</b>
			<Sample>
				<Text serif small>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>serif / smallish</b>
			<Sample>
				<Text serif smallish>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>serif / medium</b>
			<Sample>
				<Text serif medium>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>serif / semi</b>
			<Sample>
				<Text serif semi>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>serif / large</b>
			<Sample>
				<Text serif large>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>serif / xlarge</b>
			<Sample>
				<Text serif xlarge>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>
		</b>

		<b class={$.side}>
			<b class={$.title}>sans / xsmall</b>
			<Sample>
				<Text sans xsmall>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>sans / small</b>
			<Sample>
				<Text sans small>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>sans / smallish</b>
			<Sample>
				<Text sans smallish>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>sans / medium</b>
			<Sample>
				<Text sans medium>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>sans / semi</b>
			<Sample>
				<Text sans semi>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>sans / large</b>
			<Sample>
				<Text sans large>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>

			<b class={$.title}>sans / xlarge</b>
			<Sample>
				<Text sans xlarge>
					The end result was a mixin that worked regardless of font size and
					only required a unitless line height to perform the calculation. But
					my confidence was dashed when I applied the mixin to a different font
					face. The end result was a mixin that worked regardless of font size
					and only required a unitless line height to perform the calculation.
					But my confidence was dashed when I applied the mixin to a different
					font face.
				</Text>
			</Sample>
		</b>
	</b>
);
