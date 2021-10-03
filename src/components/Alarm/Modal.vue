<style>
.modal-wrap {
    width: 800px;
    height: 480px;
}
.modal {
    width: 700px;
}
</style>
<template>
    <div
        class="modal-wrap fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="flex items-end justify-center">
            <div
                class="
                    fixed
                    inset-0
                    bg-gray-700 bg-opacity-80
                    transition-opacity
                "
                aria-hidden="true"
            ></div>
            <div
                class="
                    modal
                    text-white
                    mt-6
                    inline-block
                    align-top
                    bg-pink-900
                    rounded-lg
                    text-left
                    overflow-hidden
                    shadow-xl
                    transform
                    transition-all
                "
            >
                <div class="p-4">
                    <slot name="body"></slot>
                </div>
                <div class="p-4 flex flex-row-reverse">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
