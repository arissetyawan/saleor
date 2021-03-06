from django.urls import reverse


def test_page_list(admin_client):
    url = reverse('dashboard:page-list')

    response = admin_client.get(url)
    assert response.status_code == 200


def test_page_edit(admin_client, page):
    url = reverse('dashboard:page-update', args=[page.pk])

    response = admin_client.get(url)
    assert response.status_code == 200
    data = {
        'slug': 'changed-url',
        'title': 'foo',
        'content': 'bar',
        'visible': True}

    response = admin_client.post(url, data=data)
    assert response.status_code == 302


def test_page_add(admin_client):
    url = reverse('dashboard:page-add')

    response = admin_client.get(url)
    assert response.status_code == 200

    data = {
        'slug': 'aaaa',
        'title': 'foo',
        'content': 'bar',
        'visible': False}

    response = admin_client.post(url, data=data)
    assert response.status_code == 302


def test_page_delete(admin_client, page):
    url = reverse('dashboard:page-delete', args=[page.pk])

    response = admin_client.get(url)
    assert response.status_code == 200

    response = admin_client.post(url, data={'a': 'b'})
    assert response.status_code == 302
