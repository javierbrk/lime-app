import { Trans } from "@lingui/macro";

export const Footer = () => {
    const imgClass = "h-16";
    return (
        <div
            className={
                "z-50 fixed bottom-0 w-full flex justify-around content-center items-center"
            }
        >
            <div>
                <img
                    src={"assets/icons/AlterMundiLogo.svg"}
                    className={imgClass}
                />
            </div>
            <div className={"flex flex-col text-center text-xl"}>
                <div className={"italic font-normal text-2xl"}>
                    <Trans>Need support?</Trans>
                </div>
                <div>
                    <Trans>
                        Join{" "}
                        <a
                            className={"text-[#0198FE] hover:text-[#F39100]"}
                            href={"https://foro.librerouter.org"}
                        >
                            foro.librerouter.org
                        </a>
                    </Trans>
                </div>
                <div>
                    <Trans>
                        Visit{" "}
                        <a
                            className={"text-[#F39100] hover:text-[#0198FE]"}
                            href={"https://docs.altermundi.net"}
                        >
                            docs.altermundi.net
                        </a>
                    </Trans>
                </div>
            </div>
            <div>
                <img
                    src={"assets/icons/LibreRouterLogo.svg"}
                    className={imgClass}
                />
            </div>
        </div>
    );
};
