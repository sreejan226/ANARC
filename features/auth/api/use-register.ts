import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.register)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;


export const useRegister = () => {

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ json }) => {
			const res = await client.api.auth.register["$post"]({ json });
			if (!res.ok) {
				throw new Error("login failed");
			}
			return await res.json();
		},
	});
	return mutation;
};
