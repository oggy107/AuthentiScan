import { FC, useEffect } from "react";
import { toast } from "react-toastify";

import useGetUnverifiedManufacturers from "../hooks/useGetUnverifiedManufacturers";
import useVote from "../hooks/useVote";
import { AccessErrors, WalletErrors, VoteErrors } from "../errors";
import Button from "../components/Button";

const Vote: FC = () => {
    const { unverifiedManufacturers, isError, error } =
        useGetUnverifiedManufacturers();

    const {
        castVote,
        isError: voteIsError,
        isSuccess: voteIsSuccess,
        error: voteError,
        isLoading: voteIsLoading,
    } = useVote();

    const handleErrors = (error: Error | null) => {
        if (error?.message.includes(AccessErrors.NotVerified.Exception)) {
            toast.error(AccessErrors.NotVerified.ExceptionMessage);
        } else if (
            error?.message.includes(AccessErrors.EntityNotTrusted.Exception)
        ) {
            toast.error(AccessErrors.EntityNotTrusted.ExceptionMessage);
        } else if (
            error?.message.includes(VoteErrors.AlreadyVerified.Exception)
        ) {
            toast.error(VoteErrors.AlreadyVerified.ExceptionMessage);
        } else if (
            error?.message.includes(VoteErrors.AlreadyCastedVote.Exception)
        ) {
            toast.error(VoteErrors.AlreadyCastedVote.ExceptionMessage);
        } else if (
            error?.message.includes(WalletErrors.WalletUserRejected.Error)
        ) {
            toast.error(WalletErrors.WalletUserRejected.ErrorMessage);
        } else {
            toast.error(error?.name);
        }
    };

    useEffect(() => {
        toast.dismiss();

        if (isError) {
            handleErrors(error);
        }
        if (voteIsError) {
            handleErrors(voteError);
        }
        if (voteIsLoading) {
            toast.info("Please Check Wallet");
        }
        if (voteIsSuccess) {
            toast.success("Vote Casted Successfully");
        }
    }, [isError, voteIsError, voteIsLoading, voteIsSuccess]);

    const handleClick = (id: string) => {
        castVote(id as `0x${string}`);
    };

    return (
        <div className="flex flex-grow">
            <div className="w-full h-full px-10 mt-[70px] mb-[155px]">
                <div className="w-full h-full px-5 flex items-center flex-col">
                    <div className="mt-2 flex flex-col items-center">
                        <div className="text-gray-950 text-4xl font-bold mb-2">
                            Verify Manufacturer
                        </div>
                        <div className="text-neutral-700 text-base font-normal">
                            Cast your vote to verify manufacturer
                        </div>
                    </div>
                    {unverifiedManufacturers ? (
                        <div className="w-full  mt-3">
                            <div className="grid grid-cols-8 border-b border-black border-opacity-25 px-[13px] py-[11px]">
                                <div className="text-zinc-500 text-xs font-medium">
                                    Logo
                                </div>
                                <div className="text-zinc-500 text-xs font-medium truncate pr-5">
                                    Manufacturer Name
                                </div>
                                <div className="text-zinc-500 text-xs font-medium col-span-3">
                                    Manufacturer ID
                                </div>
                                <div className="text-zinc-500 text-xs font-medium col-span-2">
                                    Email
                                </div>
                                <div className="text-zinc-500 text-xs font-medium">
                                    Vote
                                </div>
                            </div>
                            {unverifiedManufacturers?.map(
                                (unverifiedManufacturer) => (
                                    <div
                                        className="grid grid-cols-8 border-b border-black border-opacity-25 px-[13px] py-[11px]"
                                        key={unverifiedManufacturer.id}
                                    >
                                        <div className="w-[30px]">
                                            <img
                                                src={
                                                    unverifiedManufacturer.logo
                                                }
                                                alt={
                                                    unverifiedManufacturer.name
                                                }
                                            />
                                        </div>
                                        <div>{unverifiedManufacturer.name}</div>
                                        <div className="col-span-3">
                                            {unverifiedManufacturer.id}
                                        </div>
                                        <div className="col-span-2">
                                            {unverifiedManufacturer.email}
                                        </div>
                                        <Button
                                            title="vote"
                                            className="h-[30px] py-1 px-[40px] font-semibold"
                                            secondary
                                            onclick={() => {
                                                handleClick(
                                                    unverifiedManufacturer.id
                                                );
                                            }}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        isError && (
                            <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
                                <div className="text-5xl">
                                    You Are Not A Trusted Entity
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vote;
