type inventoryType = {
    setInventoryFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InventoryModal(props: inventoryType) {
    const closeInventoryModal = () => {
        props.setInventoryFlag(false);
    };

    return (
        <section className="absolute w-[80%] h-[80%] flex justify-center items-center border-8 color-border-sublight color-bg-main rounded-xl z-50 animation-modal mt-10">
            <div className="absolute left-4 w-[95%] h-[90%] bg-white"></div>
            <div
                className="absolute text-3xl flex items-center justify-center text-white -top-8 -right-8 w-16 h-16 border-[6px] color-border-sublight color-bg-orange1 rounded-full cursor-pointer"
                onClick={() => {
                    closeInventoryModal();
                }}
            >
                X
            </div>
        </section>
    );
}
