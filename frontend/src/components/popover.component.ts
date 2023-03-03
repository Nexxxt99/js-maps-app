import bootstrap, {Popover} from "bootstrap";
import Overlay from "ol/Overlay";
import {pgSourceSaver} from "../services/data-storage.service";
import {pgSource} from "../sources/postgres.source";
import {WKT} from "ol/format";

const getPopupContainer: () => HTMLElement = () => {
    const element = document.getElementById('popup')
    if (!element) {
        throw new Error("There is no popup container. Check html.")
    }
    return document.getElementById('popup')!
}

export const popupContainer: HTMLElement = getPopupContainer()


export const popup = new Overlay({
    element: popupContainer,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
})

const getPopoverContent = (initValue: string) => '<form id="object-create-form" action="">' +
    '<div class="input-group mb-3">' +
    '<input type="hidden" class="form-control" id="object-coords" value="' + initValue + '">' +
    '<textarea class="form-control" id="object-description" rows="3" required></textarea>' +
    '</div>' +
    '<button type="submit" class="btn btn-primary">Сохранить</button>' +
    '</form>'


export const renderPopover: (container: HTMLElement, initValue: string) => Popover = (container, initValue) => {
    let popover = Popover.getInstance(container)

    if (popover) {
        popover.dispose()
    }

    popover = new Popover(container, {
        container: container,
        animation: false,
        content: getPopoverContent(initValue),
        sanitize: false,
        html: true,
        placement: 'top',
        title: '<div class="row">' +
            '<div class="col-10">' +
            'Добавьте описание' +
            '</div>' +
            '<div class="col-2">' +
            '<button id="popover-btn-close" type="button" class="btn-close" aria-label="Закрыть"></button>' +
            '</div>' +
            '</div>',
    })

    popover.show()

    document.getElementById("popover-btn-close")?.addEventListener("click", () => {
        console.log('click')
        popover?.dispose()
    })

    document.getElementById("object-create-form")?.addEventListener("submit", async (e) => {
        e.preventDefault()
        const coords = (document.getElementById("object-coords") as HTMLInputElement)?.value
        const description = (document.getElementById("object-description") as HTMLInputElement)?.value

        await pgSourceSaver(coords,description)
        pgSource.addFeature(new WKT().readFeature(coords))
    })

    return popover
}

