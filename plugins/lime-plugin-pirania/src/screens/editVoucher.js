import { h } from "preact";
import { useState } from "preact/hooks";
import I18n from "i18n-js";
import Loading from "../../../../src/components/loading";
import { route } from "preact-router";
import style from "../style.less";
import { useListVouchers, useRename, useInvalidade } from "../piraniaQueries";
import GoBack from "../components/goBack";

const EditVoucherForm = ({ submit, status, name }) => {
	const [description, setDescription] = useState(name);
	const [isDisabled, setDisabled] = useState(status === "disabled");

	return (
		<form
			onSubmit={(e) => submit(e, description, isDisabled)}
			class={style.createForm}
		>
			<label for="description">{I18n.t("description")}</label>
			<textarea
				id="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			{status !== 'disabled' && <div class={style.isPermanent}>
				<label for="permanent">{I18n.t("disable voucher")}</label>
				<input
					checked={isDisabled}
					type="checkbox"
					value={isDisabled}
					id="permanent"
					onChange={() => setDisabled(!isDisabled)}
				/>
			</div>}
			<button type="submit">{I18n.t("save")}</button>
		</form>
	);
};

const EditVoucher = ({ id }) => {
	const [renameVoucher] = useRename();
	const [disableVoucher] = useInvalidade();
	const submit = async (e, name, isDisabled) => {
		e.preventDefault()
		if (isDisabled) await disableVoucher({ id });
		await renameVoucher({
			id,
			name
		});
		route(`/access/view/${id}`);
	};
	const { data: vouchers } = useListVouchers();
	if (vouchers) {
		return (
			<div class="container container-padded">
				<div class={style.goBackTitle}>
					<GoBack url={`/access/view/${id}`} />
					<h1>{I18n.t("voucher details")}</h1>
				</div>
				<EditVoucherForm
					submit={submit}
					{...vouchers.filter((v) => v.id === id)[0]}
				/>
			</div>
		);
	}
	return <Loading />;
};

export default EditVoucher;
